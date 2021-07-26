import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { MenuUserComponent } from "./menu/menu-user/menu-user.component";
import { MenuComponent } from "./menu/menu.component";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        MenuComponent,
        FooterComponent,
        MenuUserComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MenuComponent,
        FooterComponent,
        NotFoundComponent,
        MenuUserComponent
    ]
})

export class NavigationModule {}