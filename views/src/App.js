import React from 'react';
import { Routes,Route } from 'react-router-dom'
import UserLogin from './Components/User/UserLogin'
import Deliver from './Components/User/Deliver'
import Pick from './Components/User/Pick'
import Main from './Components/User/Main';

 import Sucees from './Components/Request/Sucees';
 import Failed from './Components/Request/Failed';
import Login from './Components/Admin/auth/Login';
import Dashboard from './Components/Admin/Dash.js';
import Create_user from './Components/Admin/User/Create_user';
import Show_user from './Components/Admin/User/Show_user';
import Update_user from './Components/Admin/User/Update_user';
import Product from './Components/Admin/Product/Product';
import Allproducts from './Components/Admin/Product/Allproducts';
import Update_Product from './Components/Admin/Product/Update_Product';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Genarate from './Components/Admin/Genarate';
import AssignCNoteNumbers from './Components/Admin/AssignCNoteNumbers';
import AssignValueForCity from './Components/Admin/AssignValueForCity';
function App() {
  const { isAuthenticated } = useSelector((state) => state.root);

  return (
    <>

    <Routes>
      <Route path='/' element={<UserLogin/>} />
      <Route path='/main' element={<Main/>} />
      <Route path='/pick' element={<Pick/>} />
      <Route path='/deliver' element={<Deliver />} />
     <Route path='/success' element={<Sucees />} />
     <Route path='/error' element={<Failed />} />

     {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Dashboard /> 
            </ProtectedRoute>
          }
/>

<Route
          path="/admin/create_user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
            <Create_user /> 
            </ProtectedRoute>
          }
/>
<Route
          path="/admin/show_user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
            <Show_user />
            </ProtectedRoute>
          }
/>

<Route
          path="/admin/update_user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
           <Update_user />
            </ProtectedRoute>
          }
/>
<Route
          path="/admin/show_products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
           <Product />
            </ProtectedRoute>
          }
/>
<Route
          path="/admin/show_all_products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
           <Allproducts />
            </ProtectedRoute>
          }
/>
<Route
          path="/admin/update_product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
           <Update_Product />
            </ProtectedRoute>
          }
/> */}
    <Route path='/admin' element={<Login />} />
     <Route path='/admin/dashboard' element={<Dashboard />} />
     <Route path='/admin/create_user' element={<Create_user />} />
     <Route path='/admin/show_user' element={<Show_user />} />
     <Route path='/admin/update_user/:id' element={<Update_user />} />
     <Route path='/admin/show_products' element={<Product />} />
     <Route path='/admin/show_all_products' element={<Allproducts />} />
     <Route path='/admin/update_product/:id' element={<Update_Product />} />
     <Route path='/admin/genarate' element={<Genarate />} />
     <Route path='/admin/assign_cnote_no' element={<AssignCNoteNumbers />} />
     <Route path='/admin/assign_city' element={<AssignValueForCity />} />
     
    
    
    </Routes> 
    </>
  );
}

export default App;
