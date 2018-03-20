import { Component, Input, Output, OnInit, EventEmitter, DoCheck } from '@angular/core';
import { LightDatePickerService } from './lightDatePicker.Service';
import { DateMouth, DateWeek, DateDay } from './lightDatePicker.Model';

@Component({
  selector: 'lightDatePicker',
  templateUrl: './lightDatePicker.html',
  providers:[
      LightDatePickerService
  ]
})
///联系人对象信息
export class lightDatePicker implements OnInit
{
    /**
     * 日期选择的回调函数
     * 
     * @type {*}
     * @memberof lightDatePicker
     */
    @Input() selected:any;
    /**
     * 月份滑动的回调函数
     * 
     * @type {*}
     * @memberof lightDatePicker
     */
    @Input() swipe:any;
    /**
     * 输入的日期数组，表示需要高亮的日期
     * 
     * @type {Array<any>}
     * @memberof lightDatePicker
     */
    private _hightlightdata:Array<any>;
    @Input() 
    set hightlightdata(val:Array<any>){
        this._hightlightdata = val;
        this.hightLigthDate(val);
    }
    get hightlightdata(){
        return this._hightlightdata;
    }
    /**
     * 当前控件选择的月份
     * 
     * @private
     * @type {number}
     * @memberof lightDatePicker
     */
    @Output() curMonthChange = new EventEmitter<number>();
    @Input() curMonth:number;
    /**
     * 当前控件选择的年份
     * 
     * @private
     * @type {number}
     * @memberof lightDatePicker
     */
    @Output() curYearChange = new EventEmitter<number>();
    @Input() curYear:number;
    /**
     * 当前控件选择的星期
     * 
     * @type {number}
     * @memberof lightDatePicker
     */
    @Output() curWeekChange = new EventEmitter<number>();
    @Input() curWeek:number;
    /**
     * 当前控件选择的日期
     * 
     * @private
     * @type {number}
     * @memberof lightDatePicker
     */
    @Input() curDay:number;
    /**
     * 当前月份的具体数据，包括星期、日期信息、年份信息
     * 
     * @private
     * @type {DateMouth}
     * @memberof lightDatePicker
     */
    private month:DateMouth;
    /**
     * 当前星期的具体数据，包括星期、日期信息、年份，用于空间最小化的模式
     * 
     * @private
     * @type {DateWeek}
     * @memberof lightDatePicker
     */
    private week:DateWeek;
    /**
     * 上一次点击的日期，初始值为当前日
     * 
     * @private
     * @type {*}
     * @memberof lightDatePicker
     */
    private historyClickDay:number = this.ligthDatePickerService.getToday().time;
    /**
     * 显示模式，分为正常和缩小模式，缩小模式下，按周为单位，正常模式按月份为单位
     * 
     * @private
     * @type {boolean}
     * @memberof lightDatePicker
     */
    private minimize:boolean = false;

    constructor( public ligthDatePickerService:LightDatePickerService){
        let myDate = new Date();
        this.curYear = myDate.getFullYear();
        this.curMonth = myDate.getMonth() + 1;
        this.curDay = myDate.getDate();
        this.curWeek = this.ligthDatePickerService.getCurrentWeek(this.curYear, this.curMonth, this.curDay);
        this.month = this.ligthDatePickerService.getDays(this.curYear, this.curMonth);
        //this.week = this.ligthDatePickerService.getWeekDays(this.curYear, this.curMonth, this.curWeek);
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);
    }
    /**
     * 组件初始化的函数，在construction之后
     * 
     * @memberof lightDatePicker
     */
    ngOnInit(){

    }
    /**
     * 组件中所有模型更新的监听事件，先用着
     * 
     * @memberof lightDatePicker
     */
    ngDoCheck(){
        
    }
    /**
     * 获取月份信息获取周信息
     * 
     * @private
     * @returns {DateWeek} 
     * @memberof lightDatePicker
     */
    private getWeekInfoByMonth():DateWeek{
        return this.month.Weeks[this.curWeek];
    }
    /**
     * 月份增加方法
     * 
     * @memberof lightDatePicker
     */
    private AddMouth(n:number):void{
        let tmp = (this.curMonth + n) / 12;
        this.curMonth = tmp > 1 ? this.curMonth + n - 12 * Math.floor(tmp) : this.curMonth + n;
        this.curYear = tmp > 1 ? this.curYear + 1 * Math.floor(tmp) : this.curYear;
        this.month = this.ligthDatePickerService.getDays(this.curYear, this.curMonth);
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);

        this.curMonthChange.emit(this.curMonth);
        this.curYearChange.emit(this.curYear);
    }
    /**
     * 月份减少事件
     * 
     * @param {number} n 
     * @memberof lightDatePicker
     */
    private SubMouth(n:number):void{
        let tmp = (this.curMonth - n) / 12;
        this.curMonth = tmp <= 0 ? 12* (1 - Math.floor(tmp)) + this.curMonth - n : this.curMonth - n;
        this.curYear = tmp <= 0 ? this.curYear - (1 - Math.floor(tmp)) : this.curYear;
        this.month = this.ligthDatePickerService.getDays(this.curYear, this.curMonth);
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);

        this.curMonthChange.emit(this.curMonth);
        this.curYearChange.emit(this.curYear);
        this.curWeekChange.emit(this.curWeek);
    }
    /**
     * 星期增加一事件
     * 
     * @private
     * @param {number} n 
     * @memberof lightDatePicker
     */
    private AddOneWeek():void{
        let howmanyweek = this.ligthDatePickerService.howManyWeek(this.curYear, this.curMonth);
        let tmp = howmanyweek - this.curWeek;
        switch(tmp){
            case 0:
                this.curYear = this.curMonth + 1 > 12 ? this.curYear + 1 : this.curYear;
                this.curMonth = this.curMonth + 1 > 12 ? 1 : this.curMonth + 1;
                this.curWeek = 1;
                this.month = this.ligthDatePickerService.getDays(this.curYear, this.curMonth);
                break;
            // case 1:
            //     this.curYear = this.curMonth + 1 > 12 ? this.curYear + 1 : this.curYear;
            //     this.curMonth = this.curMonth + 1 > 12 ? 1 : this.curMonth + 1;
            //     this.curWeek = 1;
            //     break;
            default:
                this.curWeek += 1;
                break;
        }
        //this.week = this.ligthDatePickerService.getWeekDays(this.curYear, this.curMonth, this.curWeek);
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);

        this.curMonthChange.emit(this.curMonth);
        this.curYearChange.emit(this.curYear);
        this.curWeekChange.emit(this.curWeek);
    }
    /**
     * 星期减少一事件
     * 
     * @private
     * @param {number} n 
     * @memberof lightDatePicker
     */
    private SubOneWeek():void{
        let howmanyweek = null;
        switch(this.curWeek){
            case 1:
                howmanyweek = this.curMonth === 1? this.ligthDatePickerService.howManyWeek(this.curYear - 1, 12): this.ligthDatePickerService.howManyWeek(this.curYear, this.curMonth - 1);
                this.curYear = this.curMonth - 1 === 0 ? this.curYear - 1 : this.curYear;
                this.curMonth = this.curMonth - 1 === 0 ? 12 : this.curMonth - 1;
                this.curWeek = howmanyweek;
                this.month = this.ligthDatePickerService.getDays(this.curYear, this.curMonth);
                break;
            // case 2:
            //     howmanyweek = this.curMonth === 1? this.ligthDatePickerService.howManyWeek(this.curYear - 1, 12): this.ligthDatePickerService.howManyWeek(this.curYear, this.curMonth - 1);
            //     this.curYear = this.curMonth - 1 === 0 ? this.curYear - 1 : this.curYear;
            //     this.curMonth = this.curMonth - 1 === 0 ? 12 : this.curMonth - 1;
            //     this.curWeek = howmanyweek;
            //     break;
            default:
                this.curWeek -= 1;
                break;
        }
        //this.week = this.ligthDatePickerService.getWeekDays(this.curYear, this.curMonth, this.curWeek);
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);

        this.curMonthChange.emit(this.curMonth);
        this.curYearChange.emit(this.curYear);
        this.curWeekChange.emit(this.curWeek);
    }
    /**
     * 日期控件滑动事件
     * 
     * @param {any} event 
     * @memberof lightDatePicker
     */
    private swipeEvent(event){
        this.swipe && this.swipe({year: this.curYear, month: this.curMonth, week: this.curWeek, swipetype: event.direction});
        switch(event.direction){
            case SwipeType.DIRECTION_LEFT:
                if(this.minimize){
                    this.AddOneWeek();
                }else{
                    this.AddMouth(1);
                }
                break;
            case SwipeType.DIRECTION_RIGHT:
                if(this.minimize){
                    this.SubOneWeek();
                }else{
                    this.SubMouth(1);
                }
                break;
            case SwipeType.DIRECTION_UP:
                this.minimize = true;
                this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);
                break;
            case SwipeType.DIRECTION_DOWN:
                this.minimize = false;
                break;
        }
    }
    /**
     * 日期点击事件
     * 
     * @param {any} day 
     * @memberof lightDatePicker
     */
    private onclick(day:DateDay):void{
        if(day.disable){
            return;
        }
        this.curDay = day.time;
        this.curWeek = this.ligthDatePickerService.getCurrentWeek(this.curYear, this.curMonth, this.curDay);
        let historyDay:DateDay = this.searchDay(this.historyClickDay);
        if(historyDay !== null ){
             //获取历史点击日期
            if(this.filterDate(historyDay.year, historyDay.month, historyDay.time)) {
                historyDay.cssClass = "date_cell selected_date";
            }
            else{
                historyDay.cssClass = this.ligthDatePickerService.getdaycssStyle(historyDay.year, historyDay.month, historyDay.time);
            }
            historyDay.isSelected = false;
            this.curWeek = day.week;
        }
        //定义选择日期的样式
        day.cssClass = "date_cell selected_date";
        day.isSelected = true;
        //定义新的历史点击日期
        this.historyClickDay = day.time;
        //父组件的回调函数
        this.selected && this.selected(day);
    }
    /**
     * 查找当前月份中的某一天
     * 
     * @private
     * @param {number} day 
     * @memberof lightDatePicker
     */
    private searchDay(day: number):DateDay{
        let dateday:DateDay = null;
        // if(this.minimize){
        //     for(let i = 0, length = this.week.Day.length; i < length; i++){
        //         if(this.week.Day[i].time === day){
        //             dateday = !!this.week["Day"][i]?this.week["Day"][i]:null;
        //             break;
        //         }
        //     }
        // }else{
            let weekIndex = Math.floor((this.month.FirstWeek + day - 1)/ 7);
            let dayIndex = day - ((7 - this.month.FirstWeek) + 7*(weekIndex  -1)) - 1;
            dateday =  !!this.month.Weeks[weekIndex]["Day"][dayIndex]?this.month.Weeks[weekIndex]["Day"][dayIndex]:null;
        // }
        return dateday;
    }
    /**
     * 高亮输入的日子
     * 
     * @private
     * @param {any[]} higthlightdate 
     * @memberof lightDatePicker
     */
    private hightLigthDate(higthlightdate:any[]):void{
        for (let weekIndex = 0, length = this.month.Weeks.length; weekIndex < length; weekIndex++) {
            let week = this.month.Weeks[weekIndex];
            for (let dayIndex = 0; dayIndex < week.Day.length; dayIndex++) {
                let day = week.Day[dayIndex];
                if(this.filterDate(this.curYear, this.curMonth, day.time)){
                    day.cssClass = "date_cell selected_date";
                }
            }
        }
    }
    /**
     * 过滤输入的日子里是否有需要过滤的日子
     * 
     * @private
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean} 
     * @memberof LightDatePickerService
     */
    private filterDate(year:number, month:number, day:number):boolean{
        let result = false;
        if(!!this.hightlightdata){
            for (let i = 0, length = this.hightlightdata.length; i < length; i++) {
                let element = this.hightlightdata[i];
                let tmp:any[] = element.split("-");
                if(Number(tmp[2]) === day && Number(tmp[1]) === month && Number(tmp[0]) === year){
                    result = true;
                    break;
                } 
            }
        }
        return result;
    }
    /**
     * 根据当前年月周返回星期信息
     * 
     * @private
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @memberof lightDatePicker
     */
    private getWeekDays(year:number, month:number, week:number):DateWeek{
        if(this.month.Time !== month){
            this.month = this.ligthDatePickerService.getDays(year, month); 
        }
        if(this.ligthDatePickerService.howManyWeek(year, this.month.Time) < week){
            week -= 1;
        }
        return this.month.Weeks[week - 1];
    }
    private changeMin():void{
        this.minimize = !this.minimize;
        this.week = this.getWeekDays(this.curYear, this.curMonth, this.curWeek);
    }
}
/**
 * 滑动事件的各种事件
 * 
 * @export
 * @enum {number}
 */
export enum SwipeType{
    DIRECTION_NONE = 1,
    DIRECTION_LEFT = 2,
    DIRECTION_RIGHT = 4,
    DIRECTION_UP = 8,
    DIRECTION_DOWN = 16,
    DIRECTION_HORIZONTAL = 6,
    DIRECTION_VERTICAL = 24,
    DIRECTION_ALL = 30
}
