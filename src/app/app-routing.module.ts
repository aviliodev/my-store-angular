import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  //Se activa PreloadAllModules para que cargue los demás módulos del sistema cuando la página principal ya cargó y asi ahorrar tiempo y no esperar a que se le de click a esos modulos. Es mejor usar esta técnica cuando se tienen pocos módulos, porque si se ponen a cargar muchos módulos, se utilizaria el hilo principal de ejecución.
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
