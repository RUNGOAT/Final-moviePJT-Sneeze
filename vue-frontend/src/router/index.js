import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/movie/HomeView'
import MovieDetailView from '@/views/movie/MovieDetailView'
import MovieSearchView from '@/views/movie/MovieSearchView'

import CommunityView from '@/views/community/CommunityView'
import CommunityDetailView from '@/views/community/CommunityDetailView'
import CommunityFormView from '@/components/CommunityFormView'
import CommunityDetailUpdateView from '@/views/community/CommunityDetailUpdateView'

import ProfileView from '@/views/accounts/ProfileView'
import LoginView from '@/views/accounts/LoginView'
import SignupView from '@/views/accounts/SignupView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:movie_pk',
    name: 'MovieDetail',
    component: MovieDetailView
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
    component: CommunityDetailView,
  },
  {
    path: '/community/create',
    name: 'CommunityCreate',
    component: CommunityFormView,
  },
  {
    path: '/community/update/:community_pk',
    name: 'CommunityDetailUpdate',
    component: CommunityDetailUpdateView,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
