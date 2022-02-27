import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Label, User} from '../interfaces';
import {navigation} from "../../navigation/navigation";
import {UserService} from "./user.service";
import {filter, map} from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})
export class LabelService {
    private labels$: BehaviorSubject<Array<Label>> = new BehaviorSubject(localStorage.getItem('labels') ? JSON.parse(localStorage.getItem('labels')) : []);

    public unsubscribe$: Subject<void> = new Subject();
    constructor(private userService: UserService) {
        // push labels to local storage
        this.labels$.subscribe(labels => {
            localStorage.setItem('labels', JSON.stringify(labels));
            navigation.find(item => item.id === 'labels').children = labels.map(label => ({
                id: label.id,
                title: label.name,
                icon: 'label',
                type: 'item',
                url: '/labels',
                badge    : this.getLabelUsers(label),
            }));

        });






    }

    getLabelUsers(label: Label): any {
        let length = 0
        this.userService.users.pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map(users => users.filter(user => user.labels.filter(l => l.id === label.id).length > 0))
        ).subscribe(users => {
            length = users.length
        });
        return length;
    }

    get labels(): Observable<Array<Label>> {
        return this.labels$.asObservable()
    }

    get length(): number {
        return this.labels$.getValue().length;
    }

    addLabel(newLabel: Label): Observable<Array<Label>> {
        const labels = this.labels$.getValue();
        labels.push(newLabel);
        this.labels$.next(labels);
        return this.labels;
    }

    removeLabel(label: Label): Observable<Array<Label>> {
        const labels = this.labels$.getValue();
        const index = labels.findIndex(l => l.id === label.id);
        labels.splice(index, 1);
        this.labels$.next(labels);
        return this.labels;
    }


    updateLabel(label: Label): Observable<Array<Label>> {
        const labels = this.labels$.getValue();
        const index = labels.findIndex(l => l.id === label.id);
        labels[index] = label;
        this.labels$.next(labels);
        return this.labels;
    }













}
