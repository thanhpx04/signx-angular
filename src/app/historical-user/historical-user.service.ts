import { HistoricalUser } from "./historical-user.model";

export class HistoricalUserService {
    
    private listHistoricalUser: HistoricalUser[] = [
        new HistoricalUser('1658048799000', 'Tasty', 'A super-tasty Schnitzel - just awesome!'),
        new HistoricalUser('1657998399000', 'Schnitzel', 'What else you need to say?')
    ];

    getListHistoricalUser() {
        // return new copy of array to avoid reference array
        return this.listHistoricalUser.slice();
    }
}