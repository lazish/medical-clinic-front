import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../user/models/doctor';
import { DoctorService } from '../user/services/doctor.service';
import { Category } from '../categories/models/category';
import { Pin } from '../user/models/pin';
import { Constants } from '../constants';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private modalService: ModalService
  ) {}

  allDoctors: Doctor[] = []
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  showAll: boolean = false;
  showDocotrModal = false

  ngOnInit(): void {
    this.doctorService.getDoctors(0).subscribe({
      next: (data) => {
        if (data.res) {
          if (data.res.length > Constants.DOCTORS_COUNT_ON_HOME) {
            this.doctors = data.res.slice(0, 6);
            this.allDoctors = data.res
            this.showAll = true;
          } else {
            this.doctors = data.res;
          }
          this.filteredDoctors = this.doctors;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onShowAll() {
    this.showDocotrModal = true
    this.modalService.usersModal = true
  }

  onDoctorModalClose(){
    this.showDocotrModal = false
  }

  onBooking(user: any) {
    this.router.navigate(['booking/', user.id]);
    this.doctorService.increaseDeoctorView(user.id).subscribe((data) => {
      if (data.res) {
      } else {
      }
    });
  }

  onPin(pin: Pin) {
    this.doctorService.pin(pin).subscribe((data) => {
      if (data.res != null) {
        const fromIndex = this.getIndexById(pin.doctorId, this.doctors);
        this.doctors = this.changePosition(this.doctors, fromIndex, data.res);
      } else {
        console.log(data.errors);
      }
    });
  }

  changePosition(array: any[], from: number, to: number) {
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
  }

  getIndexById(id: number, array: any[]) {
    for (let i = 0; i < this.doctors.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  onCategorySelect(category: Category) {
    this.filteredDoctors = this.allDoctors.filter(
      (doctor) => doctor.category.id === category.id
    );
  }
}
