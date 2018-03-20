import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

///原因是hanmmerjs默认是手势事件都是水平方向的

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL } // 重载设置
    }
}