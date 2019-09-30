import Wifi from './wifi';
import Noise from './noise';
import Plug from './plug';
import Schedule from './schedule';

export default class Establishmment {
    name: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    wifi: Wifi;
    noise: Noise;
    plug: Plug;
    schedule: Schedule;
}
