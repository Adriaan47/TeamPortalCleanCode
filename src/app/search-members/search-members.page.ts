import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { SearchView } from '../interfaces/searchView';

@Component({
  selector: 'app-search-members',
  templateUrl: './search-members.page.html',
  styleUrls: ['./search-members.page.scss'],
})
export class SearchMembersPage implements OnInit, AfterViewInit {
  results: SearchView[] = [];
  displayedColumns: string[] = ['name', 'surname', 'skills'];
  dataSource: MatTableDataSource<SearchView>;

  constructor(private afs: AngularFirestore, private user: UsersService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.user.getMemberSKills().subscribe((user: any[]) => {
      user.forEach(doc => {
        return this.results.push(this.mapSearchView(doc));
      });
      this.dataSource = new MatTableDataSource(this.results);
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });
  }
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapSearchView(data: any): SearchView {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      eid: data.eid,
      nickname: data.nickname,
      birthDate: data.birthDate,
      careerLevel: data.careerLevel,
      mobile: data.mobile,
      skills: data.skills,
    };
  }

}
