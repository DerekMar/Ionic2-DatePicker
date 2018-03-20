import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { lightDatePicker} from './lightDatePicker';
import { LightDatePickerService } from './lightDatePicker.Service';

@NgModule({
    declarations: [lightDatePicker],
    imports: [IonicModule],
    providers: [
        LightDatePickerService
    ],
    exports:[lightDatePicker]
})
export class LightDatePickerModule { }
