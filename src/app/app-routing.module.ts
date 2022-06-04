import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CustomPreloadService } from './services/custom-preload.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
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
  //Se activa PreloadAllModules (estrategia que viene por defecto) para que cargue los demás módulos del sistema cuando la página principal ya cargó y asi ahorrar tiempo y no esperar a que se le de click a esos modulos. Es mejor usar esta técnica cuando se tienen pocos módulos, porque si se ponen a cargar muchos módulos, se utilizaria el hilo principal de ejecución.
  //-pero luego mejor creamos nuestra propia estrategia personalizada de carga (que se adecua mejor a aplicaciones más grandes), mediante un servicio que creamos CustomPreloadService.
  //-pero pero como tercer opción, implementamos una estrategia "QuicklinkStrategy" que no es propia de Angular, si no que se instala por aparte. Esta estrategia precarga solo los módulos de los links que hay actualmente en pantalla. es decir, si hay un link a la página de detalles, entonces s eva a cargar la págian de detalles antes de darle click. adicionalmente, para que funcione, se debe activar en cada módulo donde desee usarse. Esto se hace agregando el import de QuicklinkModule en cada módulo donde se desee usar.
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: QuicklinkStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
