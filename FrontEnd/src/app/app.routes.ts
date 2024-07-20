import { Routes } from '@angular/router';
import {SofasComponent} from "./sofas/sofas.component";
import {SignupComponent} from "./signup/signup.component";
import {MattressesComponent} from "./mattresses/mattresses.component";
import {FurnitureComponent} from "./furniture/furniture.component";
import {FurnishingComponent} from "./furnishing/furnishing.component";
import {DecorComponent} from "./decor/decor.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {LogoutComponent} from "./logout/logout.component";
import {CartComponent} from "./cart/cart.component";
import {AdminformComponent} from "./adminform/adminform.component";
import {Admin1Component} from "./admin1/admin1.component";
import {HomeComponent} from "./pages/home/home.component";
import {Cart1Component} from "./pages/cart1/cart1.component";
import {ProductComponent} from "./product/product.component";
import {WishlistComponent} from "./pages/wishlist/wishlist.component";
import {ReportComponent} from "./report/report.component";

export const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"report", component: ReportComponent},
  {path:"wishlist", component: WishlistComponent},
  {
    path:"", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "product", component: ProductComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "mattresses", component: MattressesComponent
  },
  {
    path: "furniture", component: FurnitureComponent
  },
  {
    path: "furnishing", component: FurnishingComponent
  },
  {
    path: "decor", component: DecorComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "admin", component: AdminComponent
  },
  {
    path:"logout", component: LogoutComponent
  },
  {
    path:"cart", component: Cart1Component
  },
  {
    path:"adminform", component: AdminformComponent
  },
  {
    path:"admin1", component: Admin1Component
  }
];
