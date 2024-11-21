import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { Resetpass2Component } from './resetpass2/resetpass2.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { CaNhanComponent } from './ca-nhan/ca-nhan.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { DichVuChiTietComponent } from './dich-vu-chi-tiet/dich-vu-chi-tiet.component';
import { GoiDichVuChiTietComponent } from './goi-dich-vu-chi-tiet/goi-dich-vu-chi-tiet.component';
import { KhuyenMaiComponent } from './khuyen-mai/khuyen-mai.component';
import { LienHeComponent } from './lien-he/lien-he.component';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';
import { TinTucChiTietComponent } from './tin-tuc-chi-tiet/tin-tuc-chi-tiet.component';
import { DanhGiaComponent } from './danh-gia/danh-gia.component';
import { DatLichComponent } from './dat-lich/dat-lich.component';
import { TimKiemComponent } from './tim-kiem/tim-kiem.component';
import { HSCNComponent } from './ca-nhan/hscn/hscn.component';
import { LSDLComponent } from './ca-nhan/lsdl/lsdl.component';
import { ThongBaoComponent } from './ca-nhan/thong-bao/thong-bao.component';



export const routes: Routes = [
    {path: 'trangChu', component: TrangChuComponent, canActivate:[AuthGuard]},
    {path:'caNhan', component: CaNhanComponent, children:
        [{path: 'HoSoCaNhan', component: HSCNComponent},
         {path: 'LichSuDatLich', component: LSDLComponent},
         {path: 'Xemthongbao', component: ThongBaoComponent},
         ]
    },

    {path: 'login', component: LoginComponent}, 
        
    {path:'register', component:RegisterComponent},
    {path:'resetpass', component: ResetpassComponent},
    {path:'resetpass#',component:Resetpass2Component},

    { path: 'gioiThieu', component: GioiThieuComponent },

    { path: 'dichVu', component: DichVuComponent},
    { path: 'dichVu/:maLinhVuc', component: DichVuChiTietComponent},
    { path: 'dichVu/:maLinhVuc/:maGoi', component: GoiDichVuChiTietComponent},
    { path: 'khuyenMai', component: KhuyenMaiComponent },
    { path: 'lienHe', component: LienHeComponent },
    { path: 'tinTuc', component: TinTucComponent },
    { path: 'tinTuc/:maTinTuc', component: TinTucChiTietComponent},
    { path: 'danhGia', component: DanhGiaComponent },
    { path: 'datLich', component: DatLichComponent },
    { path: 'timKiem', component: TimKiemComponent },
    { path: '', redirectTo: '/trangChu', pathMatch: 'full' },
    { path: '**', redirectTo: '/trangChu' } // Điều hướng wildcard
];
