
import { NgModule } from "@angular/core";
import { TrimValueDirective } from "../core/directives/trim-value.directive";

// Directives
const DIRECTIVES = [
	TrimValueDirective,
];

@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class SharedModule {}
