import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { lightDatePicker } from '../../app/lightDatePicker/lightDatePicker';
import { LightDatePickerService } from '../../app/lightDatePicker/lightDatePicker.Service';
import { DateDay } from '../../app/lightDatePicker/lightDatePicker.Model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LightDatePickerService]
})
export class HomePage {
     /**
   * 日期控件的对象，可用的属性有如下：
   * selected：绑定日期控件选择的回调函数
   * 
   * @type {lightDatePicker}
   * @memberof ConferencePage
   */
  @ViewChild('lightDatePicker') DatePicker:lightDatePicker;
  /**
   * 当前月份,此变量可以控制日历控件的月份
   * 
   * @type {number}
   * @memberof ConferencePage
   */
  public month:number;
  /**
   * 当前年份,此变量可以控制日历控件的年份
   * 
   * @type {number}
   * @memberof ConferencePage
   */
  public year:number;
  /**
   * 当前星期，此变量可以控制日历控件的星期
   * 
   * @type {number}
   * @memberof ConferencePage
   */
  public week:number;
  /**
   * 需要高亮的日期数组
   * 
   * @private
   * @type {any[]}
   * @memberof ConferencePage
   */
  private hightlightdata:any[] = ['2018-3-21'];

  constructor(public navCtrl: NavController, private dateService:LightDatePickerService,) {
    let myDate = new Date();
    this.year = myDate.getFullYear();
    this.month = myDate.getMonth() + 1;
  }
  /**
   * 日期控件的选择事件
   * 
   * @param {any} day 
   * @memberof ConferencePage
   */
  public selectfunc(day:DateDay):void{
    alert(day.year + '/' + day.month + '/' + day.time);
  }
    /**
   * 滑动时间的回调函数
   * 
   * @param {any} data 
   * @memberof ConferencePage
   */
  public swipefunc = (data:{month:string, year:string, week:string}):void =>{
    alert(data.year + '/' + data.month);
  }
  /**
   * 日期组件月份变化的函数
   * 
   * @param {number} month 
   * @memberof ConferencePage
   */
  public MonthChange(month:number):void{
    this.month = month;
  }
  /**
   * 日期控件年份变化的函数
   * 
   * @param {number} year 
   * @memberof ConferencePage
   */
  public YearChange(year:number):void{
    this.year = year;
  }
  /**
   * 日期控件星期变化函数
   * 
   * @param {number} week 
   * @memberof ConferencePage
   */
  public WeekChange(week:number):void{
    this.week = week;
  }

}
