import { DateTime } from 'luxon';

export abstract class DateHelper {
    public static now(): DateTime {
        return DateTime.now();
    }

    public static age(date: DateTime): number {
        return Math.floor(DateHelper.now().diff(date, 'years').years);
    }

    public static parseFromSQLDate(date: string): DateTime {
        return DateTime.fromSQL(date);
    }

    public static parseFromUserGivenTimestamp(timestamp: string): DateTime {
        return DateTime.fromFormat(timestamp, 'yyyy-MM-dd HH:mm:ss z');
    }

    public static parseFromDatabaseTimestamp(timestamp: string | undefined): DateTime {
        return typeof timestamp === 'undefined' || timestamp === null
            ? null
            : DateTime.fromJSDate(new Date(timestamp));
    }

    public static parseFromJsDate(date: Date): DateTime {
        return DateTime.fromJSDate(date);
    }
}
