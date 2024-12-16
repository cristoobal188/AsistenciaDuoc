import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashscreen',
    pathMatch: 'full'
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./pages/splashscreen/splashscreen.module').then(m => m.SplashscreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },
  {
    path: 'alumno-dashboard',
    loadChildren: () => import('./pages/alumno/alumno-dashboard/alumno-dashboard.module').then(m => m.AlumnoDashboardPageModule)
  },
  {
    path: 'profesor-dashboard',
    loadChildren: () => import('./pages/profesor/profesor-dashboard/profesor-dashboard.module').then(m => m.ProfesorDashboardPageModule)
  },
  {
    path: 'all-users',
    loadChildren: () => import('./pages/all-users/all-users.module').then(m => m.AllUsersPageModule)
  },
  {
    path: 'perfil-admin',
    loadChildren: () => import('./perfiles/perfil-admin/perfil-admin.module').then(m => m.PerfilAdminPageModule)
  },
  {
    path: 'perfil-alumno',
    loadChildren: () => import('./perfiles/perfil-alumno/perfil-alumno.module').then(m => m.PerfilAlumnoPageModule)
  },
  {
    path: 'perfil-profesor',
    loadChildren: () => import('./perfiles/perfil-profesor/perfil-profesor.module').then(m => m.PerfilProfesorPageModule)
  },
  {
    path: 'asignaturas-alumno',
    loadChildren: () => import('./pages/asignaturas-alumno/asignaturas-alumno.module').then(m => m.AsignaturasAlumnoPageModule)
  },
  {
    path: 'profesor-detalle',
    loadChildren: () => import('./pages/profesor-detalle/profesor-detalle.module').then(m => m.ProfesorDetallePageModule)
  },
  {
    path: 'clases-profesor',
    loadChildren: () => import('./pages/clases-profesor/clases-profesor.module').then(m => m.ClasesProfesorPageModule)
  },
  {
    path: 'asistencia-alumnos',
    loadChildren: () => import('./pages/asistencia-alumnos/asistencia-alumnos.module').then(m => m.AsistenciaAlumnosPageModule)
  },
  {
    path: 'inscritos-alumnos',
    loadChildren: () => import('./pages/inscritos-alumnos/inscritos-alumnos.module').then(m => m.InscritosAlumnosPageModule)
  },
  {
    path: 'qr-clases',
    loadChildren: () => import('./pages/qr-clases/qr-clases.module').then(m => m.QrClasesPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'edit-user/:uid',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
