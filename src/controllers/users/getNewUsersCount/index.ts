import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const prisma = new PrismaClient();

const search = {
  day: "week",
  week: "month",
  month: "year",
};

export const getNewUsersStats = async (req: Request, res: Response) => {
  try {
    const { unitOfTime } = req.query as { unitOfTime: keyof typeof search };
    const currentDate = moment();
    const startDate = currentDate
      .clone()
      .startOf(search[unitOfTime] as moment.unitOfTime.StartOf);

    const result = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate.toDate(),
          lte: currentDate.toDate(),
        },
      },
    });

    let userStats: any[] = [];

    if (unitOfTime === "day") {
      // Create an array with counts for each day
      const numberOfDaysPassed = moment
        .duration(currentDate.diff(startDate))
        .asDays();
      userStats = Array.from(
        { length: Math.max(7, numberOfDaysPassed) },
        (_, index) => {
          if (index > numberOfDaysPassed) return null;
          const currentDate = startDate.clone().add(index, "days");
          const count = result.filter((item) =>
            moment(item.createdAt).isSame(currentDate, "day")
          ).length;

          return count;
        }
      );
    } else if (unitOfTime === "week") {
      const startOfWeek = startDate.clone().startOf("week");
      const endOfWeek = currentDate.clone().endOf("week");
      const weeksPassed = moment
        .duration(endOfWeek.diff(startOfWeek))
        .asWeeks();
      // Create an array with counts for each week within the current month
      userStats = Array.from(
        { length: Math.max(4, weeksPassed) },
        (_, index) => {
          if (index > weeksPassed) return null;
          const currentWeekStart = startOfWeek.clone().add(index, "weeks");
          const currentWeekEnd = currentWeekStart.clone().endOf("week");

          const count = result.filter(
            (item) =>
              moment(item.createdAt).isSameOrAfter(currentWeekStart, "day") &&
              moment(item.createdAt).isSameOrBefore(currentWeekEnd, "day")
          ).length;

          return count;
        }
      );
    } else if (unitOfTime === "month") {
      const startOfMonth = startDate.clone().startOf("month");
      const endOfMonth = currentDate.clone().endOf("month");
      const monthsPassed = Math.floor(
        moment.duration(endOfMonth.diff(startOfMonth)).asMonths()
      );
      // Create an array with counts for each month within the current year
      userStats = Array.from(
        {
          length: Math.max(12, monthsPassed),
        },
        (_, index) => {
          if (index > monthsPassed - 1) return null;
          const currentMonthStart = startOfMonth.clone().add(index, "months");
          const currentMonthEnd = currentMonthStart.clone().endOf("month");

          const count = result.filter(
            (item) =>
              moment(item.createdAt).isSameOrAfter(currentMonthStart, "day") &&
              moment(item.createdAt).isSameOrBefore(currentMonthEnd, "day")
          ).length;

          return count;
        }
      );
    }

    res.json(userStats);
  } catch (error) {
    res.status(500).json(error);
  }
};
