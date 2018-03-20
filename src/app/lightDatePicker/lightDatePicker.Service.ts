import { Injectable } from '@angular/core';
import { DateMouth, DateWeek, DateDay  } from './lightDatePicker.Model';

@Injectable()
export class LightDatePickerService{
    /**
     * 获取某年某月，一个月有多少天
     * 
     * @param {number} year 
     * @param {number} month 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    public getDayNum(year:number, month:number):number{
        let date = new Date(Date.UTC(year, month, 0));
        return date.getDate();
    }
    /**
     * 获取某年某月，第一天是星期几
     * 
     * @param {number} year 
     * @param {number} month 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    public getFirstDayInWeek(year:number, month:number):number{
        let date = new Date(Date.UTC(year, month - 1, 1));
        return date.getDay();
    }
    /**
     * 返回当天的日期
     * 
     * @returns {DateDay} 
     * @memberof LightDatePickerService
     */
    public getToday():DateDay{
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let week = this.getCurrentWeek(year, month, day);
        // return date.getDate();
        let tmpDay:DateDay = {
            time: day,
            week: week,
            cssClass: this.getdaycssStyle(year, month, day),
            disable: false,
            isToday: true,
            month: month,
            year: year,
            isSelected:false
        }
        return tmpDay;
    }
    /**
     * 返回一个月里面的日期信息
     * 这里，只获取了当月的信息，如果需要像外面的日历控件一样，需要获取上一个月以及下一个月首尾的日期，则可以通过
     * Date(year, month, 相对日期的天数)
     * @param year 
     * @param month 
     */
    public getDays(year:number, month:number):DateMouth{
        let daynum =  this.getDayNum(year, month); //当前月份有多少天 28-31
        let firstdayinweek = this.getFirstDayInWeek(year, month);//当前月份第一天是星期几 0-6
        let rownum = Math.ceil((daynum + firstdayinweek)/7);//当前月份有多少个星期 4-6
        let weekArray = new Array<DateWeek>();

        for(let i:number = 0; i < rownum; i++){
            let temweek:DateWeek = null;
            let tmpDays = new Array<DateDay>();
            for(let j = 7 * i; j < 7 * ( i + 1 ); j++){
                let actualday = this.getactualday(firstdayinweek, daynum, j);
                let actualmonth = this.getactualmonth(year, month, firstdayinweek, daynum, j);
                let actualyear = this.getactualyear(year, month, firstdayinweek, daynum, j);
                let tmpDay:DateDay = {
                    time: actualday,
                    week: i + 1,
                    cssClass: this.getdaycssStyle(actualyear, actualmonth, actualday),
                    disable: this.getDayDisable(year, month, firstdayinweek, daynum, j),
                    isToday: this.isToday(actualyear, actualmonth, actualday),
                    month: actualmonth,
                    year: actualyear,
                    isSelected:false
                }
                tmpDays.push(tmpDay);
            }
            temweek = {
                time: i + 1,
                month: month,
                year:year,
                isSelected:false,
                Day:tmpDays,
                disable: false,
                isWeek: this.isWeek(year, month, i)
            };
            weekArray.push(temweek);
        }
        let dateMonth = new DateMouth(month, year, weekArray);
        dateMonth.FirstWeek = firstdayinweek;
        dateMonth.DayNum = daynum;
        return dateMonth;
    }
    /**
     * 获取当前星期的日期信息
     * 
     * @param {number} year 
     * @param {number} week 
     * @returns {DateWeek} 
     * @memberof LightDatePickerService
     */
    // public getWeekDays(year:number, month:number, week:number):any{
    //     let firstdayinweek = this.getFirstDayInWeek(year, month);//当前月份第一天是星期几 0-6
    //     let daynum =  this.getDayNum(year, month); //当前月份有多少天 28-31
    //     let rownum = Math.ceil((daynum + firstdayinweek)/7);//当前月份有多少个星期 4-6
    //     let weekInfo:DateWeek = null;
    //     let tmpDays = new Array<DateDay>();

    //     switch(week){
    //         case 1:
    //             let lastmonthdaynum = this.getDayNum(year, month - 1);
    //             for(let i = 0; i < 7; i++){
    //                 let diff = i - firstdayinweek;
    //                 let actualday = i < firstdayinweek ? lastmonthdaynum + diff + 1: diff + 1;
    //                 let tmpmonth = i < firstdayinweek ? month - 1: month;
    //                 let actualmonth = tmpmonth < 1? 12 - tmpmonth : tmpmonth;
    //                 let actualyear = tmpmonth < 1? year - 1 : year;
    //                 let tmpDay:DateDay = {
    //                     time: actualday,
    //                     week: week,
    //                     cssClass: this.getdaycssStyle(actualyear, actualmonth, actualday),
    //                     disable: false,
    //                     isToday: this.isToday(actualyear, actualmonth, actualday),
    //                     month: actualmonth,
    //                     year:actualyear,
    //                     isSelected:false
    //                 }
    //                 tmpDays.push(tmpDay); 
    //             }
    //             break;
    //         case rownum:
    //             let lastdayinweek = (firstdayinweek + daynum) % 7 ===0 ? 7 : (firstdayinweek + daynum) % 7;
    //             for(let i = 0; i < 7; i++){
    //                 let diff = i - lastdayinweek;
    //                 let actualday = i < lastdayinweek ? daynum + diff + 1: diff + 1;
    //                 let tmpmonth = i < lastdayinweek ? month: month + 1;
    //                 let actualmonth = tmpmonth > 12? tmpmonth -12 : tmpmonth;
    //                 let actualyear = tmpmonth > 12? year + 1 : year;
    //                 let tmpDay:DateDay = {
    //                     time: actualday,
    //                     week:week,
    //                     cssClass: this.getdaycssStyle(actualyear, actualmonth, actualday),
    //                     disable: false,
    //                     isToday: this.isToday(actualyear, actualmonth, actualday),
    //                     month: actualmonth,
    //                     year:actualyear,
    //                     isSelected:false
    //                 }
    //                 tmpDays.push(tmpDay); 
    //             }
    //             break;
    //         default:
    //             let firstday = 7 * ( week - 1) - firstdayinweek + 1;
    //             for(let i = 0; i < 7; i++){
    //                 let actualday = firstday + i;
    //                 let tmpDay:DateDay = {
    //                     time: actualday,
    //                     week:week,
    //                     cssClass: this.getdaycssStyle(year, month, actualday),
    //                     disable: false,
    //                     isToday: this.isToday(year, month, actualday),
    //                     month: month,
    //                     year:year,
    //                     isSelected:false
    //                 }
    //                 tmpDays.push(tmpDay); 
    //             }
    //             break;
    //     }
    //     weekInfo = {
    //         time: week,
    //         month: month,
    //         year:year,
    //         isSelected:false,
    //         Day:tmpDays,
    //         disable: false,
    //         isWeek: this.isWeek(year, month, week + 1)
    //     };
    //     return weekInfo;
    // }
    /**
     * 根据日期，返回对应的css样式，比如周六周天的样式
     * 
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {string} 
     * @memberof LightDatePickerService
     */
    public getdaycssStyle(year:number, month:number, day:number):string{
        let date = new Date(Date.UTC(year, month - 1, day));
        let cssSytle = null;
        let week = null;
        if(this.isToday(year, month - 1, day)){
            cssSytle =  "date_cell today";
        }
        else{
            week = date.getDay();
            cssSytle =  week===0 || week ===6 ? "date_cell pointer_events_none": "date_cell";
        }
        return cssSytle;
    }
    /**
     * 获取某年的第几周
     * 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    public getCurrentWeek(year:number, month:number, day:number):number{
        let firstdayinweek = this.getFirstDayInWeek(year, month);//当前月份第一天是星期几 0-6
        return Math.ceil((day + firstdayinweek)/7);
    }
    /**
     * 返回当前月份有多少个星期
     * 
     * @param {number} year 
     * @param {number} month 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    public howManyWeek(year:number, month:number):number{
        let firstdayinweek = this.getFirstDayInWeek(year, month);
        let daynum = this.getDayNum(year, month);
        return Math.ceil((daynum + firstdayinweek)/7);
    }
    /**
     * 判断是否今天
     * 
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean} 
     * @memberof LightDatePickerService
     */
    public isToday(year:number, month:number, day:number):boolean{
        if(day === 0) {
            return false;
        }
        let today = new Date();
        let actualday = new Date(year, month, day);
        return today.toLocaleDateString() === actualday.toLocaleDateString();
    }
    /**
     * 判断是否是当前这个星期
     * 
     * @param {number} year 
     * @param {number} month 
     * @param {number} week 
     * @param {number} day 
     * @returns {boolean} 
     * @memberof LightDatePickerService
     */
    public isWeek(year:number, month:number, week:number):boolean{
        let current = new Date();
        let currentDay = current.getDate();
        let curMon = new Date(year, month - 1, 1);
        let firstDay = curMon.getDay();
        return week === Math.floor((currentDay + firstDay) / 7);
    }
    /**
     * 判断该日是否可用
     * 
     * @private
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean} 
     * @memberof LightDatePickerService
     */
    private getDayDisable(year: number, month: number, firstdayinweek: number, daynum: number, day: number):boolean{
        let date = new Date(year, month - 1, day + 1 - firstdayinweek);
        return month === date.getMonth() && year === date.getFullYear();
    }
    /**
     * 根据计算中的日期值返回当前月的日期，若不是本月的日期就返回0
     * 
     * @param {any} firstdayinweek 
     * @param {any} daynum 
     * @param {any} day 
     * @memberof LightDatePickerService
     */
    private getactualday(firstdayinweek, daynum, day):number{
        return day < firstdayinweek || day >= daynum + firstdayinweek? 0: day + 1 - firstdayinweek;
    }
    /**
     * 获取实际的月份
     * 
     * @private
     * @param {any} firstdayinweek 
     * @param {any} daynum 
     * @param {any} day 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    private getactualmonth(year: number, month: number, firstdayinweek: number, daynum: number, day: number):number{
        let date = new Date(year, month, day + 1 - firstdayinweek);
        return date.getMonth();
    }
    /**
     * 返回实际的年份
     * 
     * @private
     * @param {any} year 
     * @param {any} month 
     * @param {any} firstdayinweek 
     * @param {any} daynum 
     * @param {any} day 
     * @returns {number} 
     * @memberof LightDatePickerService
     */
    private getactualyear(year: number, month: number, firstdayinweek: number, daynum: number, day: number):number{
        let date = new Date(year, month, day + 1 - firstdayinweek);
        return date.getFullYear();
    }
}