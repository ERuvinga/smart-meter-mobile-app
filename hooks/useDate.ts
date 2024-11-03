import {
    format,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInYears,
} from "date-fns";
import { fr } from "date-fns/locale";
// create class to Format date
class FormatDate {
    private myDate = "";
    private DateNow: number;

    // initiale Class Attributs
    constructor(NewDate: string) {
        this.myDate = NewDate;
        this.DateNow = Date.now();
    }

    //Privates Functions

    private getDistanceYear = () => {
        return differenceInYears(this.DateNow, this.myDate);
    };

    private getDistanceDays = () => {
        return differenceInDays(this.DateNow, this.myDate);
    };

    private getDistanceHours = () => {
        return differenceInHours(this.DateNow, this.myDate);
    };

    private getDistanceMunites = () => {
        return differenceInMinutes(this.DateNow, this.myDate);
    };

    //publics Methodes

    public getFormateHours = () => {
        return format(this.myDate, "K", { locale: fr });
    };

    public getFormateMunites = () => {
        return format(this.myDate, "m", { locale: fr });
    };

    public getAMorPM = () => {
        return format(this.myDate, "aa", { locale: fr });
    };

    public getFormateDayWeek = () => {
        return format(this.myDate, "E", { locale: fr });
    };
    public getFormateDayMonth = () => {
        return format(this.myDate, "d", { locale: fr });
    };
    public getFormateMonth = () => {
        return format(this.myDate, "MMM", { locale: fr });
    };

    public getFormateAllDate = () => {
        return format(this.myDate, "PP", { locale: fr });
    };

    public isEqualDays = (firstDate: string) => {
        return format(firstDate, "d") == format(this.myDate, "d")
            ? true
            : false;
    };

    public isToDay = () => {
        return format(this.DateNow, "d") == this.getFormateDayMonth()
            ? "Yes"
            : "No";
    };

    public returnAdaptativeValue = () => {
        if (!this.getDistanceYear()) {
            if (format(this.DateNow, "d") == this.getFormateDayMonth()) {
                return `${this.getFormateHours()}:${this.getFormateMunites()} ${this.getAMorPM()}`;
            }
            if (
                !(format(this.DateNow, "d") == this.getFormateDayMonth()) &&
                this.getDistanceDays() >= 0 &&
                this.getDistanceDays() <= 1
            ) {
                return "Il y a 1 Jour";
            }

            if (
                !(format(this.DateNow, "d") == this.getFormateDayMonth()) &&
                this.getDistanceDays() > 1 &&
                this.getDistanceDays() <= 6
            ) {
                return this.getFormateDayWeek();
            }

            if (this.getDistanceDays() > 6) {
                return `${this.getFormateDayMonth()} ${this.getFormateMonth()}`;
            }
        } else {
            return this.getFormateAllDate();
        }
    };

    public returnAdaptativeDateValue = () => {
        if (!this.getDistanceYear()) {
            if (format(this.DateNow, "d") == this.getFormateDayMonth()) {
                return "Aujourd'hui";
            }

            if (
                !(format(this.DateNow, "d") == this.getFormateDayMonth()) &&
                this.getDistanceDays() <= 1
            ) {
                return "Hier";
            }

            if (this.getDistanceDays() > 1 && this.getDistanceDays() <= 6) {
                return this.getFormateDayWeek();
            }

            if (this.getDistanceDays() > 1) {
                return `${this.getFormateMonth()} ${this.getFormateDayMonth()}`;
            }
        } else {
            return this.getFormateAllDate();
        }
    };
}
const useDate = (MyDate: string) => {
    return new FormatDate(MyDate);
};

export default useDate;
