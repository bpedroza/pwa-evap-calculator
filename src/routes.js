import Home from './components/Home.vue'
import About from './components/About.vue'

export default [{
  path: '',
  component: Home,
  exact: true,
},
{
  path: '/about',
  component: About
},
{
  path: '*',
  component: Home
}];
