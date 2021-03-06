﻿class Entry extends Fayde.MVVM.ObservableObject {
    Date = new DateTime();
    Start = new TimeSpan();
    End = new TimeSpan();
    get Hours(): number {
        return this.End.Subtract(this.Start).TotalHours;
    }
    Rate: number = 1.0;
    get Revenue(): number {
        return this.Hours * this.Rate;
    }

    OnPropertyChanged(propertyName: string) {
        super.OnPropertyChanged(propertyName);
        switch (propertyName) {
            case "Start":
            case "End":
                this.OnPropertyChanged("Hours");
                break;
            case "Hours":
            case "Rate":
                this.OnPropertyChanged("Revenue");
                break;
        }
    }

    static FromJson(json: any): Entry {
        var e = new Entry();
        e.Date = new DateTime(json.Date);
        e.Start = new TimeSpan(json.Start);
        e.End = new TimeSpan(json.End);
        e.Rate = json.Rate || 0;
        return e;
    }
}
Fayde.MVVM.NotifyProperties(Entry, [
    "Date",
    "Start",
    "End",
    "Rate"
]);
export = Entry;