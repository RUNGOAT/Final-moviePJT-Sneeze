import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/home/HomeView'
import MovieView from '@/views/movie/MovieView'
import MovieDetailView from '@/views/movie/MovieDetailView'
import MovieSearchView from '@/views/movie/MovieSearchView'
import ReviewForm from '@/components/review/ReviewForm'
import ReviewDetail from '@/components/review/ReviewDetail'
import ReviewUpdate from '@/components/review/ReviewUpdate'

import CommunityView from '@/views/community/CommunityView'
import CommunityDetail from '@/components/community/CommunityDetail'
import CommunityFormView from '@/components/community/CommunityFormView'
import CommunityUpdate from '@/views/community/CommunityUpdate'

import MyProfile from '@/views/accounts/MyProfile'
import ProfileView from '@/views/accounts/ProfileView'
import LoginView from '@/views/accounts/LoginView'
import SignupView from '@/views/accounts/SignupView'

import LoadingView from '@/components/LoadingView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/',
    name: 'Movie',
    component: MovieView
  },
  
  {
    path: '/movie/search/:keyword',
    name: 'MovieSearch',
    component: MovieSearchView
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView,
  },
  {
    path: '/community/:community_pk',
    name: 'CommunityDetail',
    component: CommunityDetail,
  },
  {
    path: '/community/create',
    name: 'CommunityCreate',
    component: CommunityFormView,
  },
  {
    path: '/community/update/:community_pk',
    name: 'CommunityUpdate',
    component: CommunityUpdate,
  },
  {
    path: '/profile/',
    name: 'MyProfile',
    component: MyProfile,
    // props: true,
  },
  {
    path: '/profile/:user_pk',
    name: 'Profile',
    component: ProfileView,
    // props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
  {
    path: '/:movie_id',
    name: 'MovieDetail',
    component: MovieDetailView
  },
  {
    path: '/:movie_id/review/create',
    name: 'ReviewForm',
    component: ReviewForm
  },
  {
    path: '/:movie_id/review/:review_pk',
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  {
    path: '/:movie_id/review/:review_pk/update',
    name: 'ReviewUpdate',
    component: ReviewUpdate
  },
  {
    path: '/loading/movie_id',
    name: 'LoadingView',
    component: LoadingView
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
