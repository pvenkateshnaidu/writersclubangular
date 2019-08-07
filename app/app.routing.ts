import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { StoryFeedComponent } from './story-feed/story-feed.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SingleStoryComponent } from './single-story/single-story.component'
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'Blog', component: BlogComponent ,canActivate: [AuthGuard]},
    { path: 'single/:id', component: SingleStoryComponent ,canActivate: [AuthGuard]},
    { path: 'storyfeed', component: StoryFeedComponent,canActivate: [AuthGuard] },
    { path: 'mystories', component: MyStoriesComponent,canActivate: [AuthGuard] },
    { path: 'wrtiestory', component: WriteStoryComponent,canActivate: [AuthGuard] },
    { path: 'myprofile', component: MyProfileComponent,canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent,canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);