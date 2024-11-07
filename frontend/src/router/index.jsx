
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
    import { Login } from '../pages/login'
    import { Register } from '../pages/register'
    import { Home } from '../pages/home'
    import { PrivateRoutes } from './privateRoutes'
    import { InstitutionRegister } from '../pages/institution'
    import { InfoUser } from '../pages/infoUser'
    import { InfoInstitution } from '../pages/infoinstitution'
    import { UserInfoPage } from '../pages/perfilUser'
    import { AdminInstitutionList } from '../pages/admin/aprovacao/AdminInstitutionApproval'
    import { Chat } from '../pages/chat/Chat'
    import { CreateEvent } from '../pages/event/CreateEvent'



    export const AppRouter = () => {
        return(
            <Router>
                <Routes>
                    <Route path='/' exact element={ <Home/> } /> 
                    <Route path='/login' exact element={ <Login/> } /> 
                    <Route path='/register' exact element={ <Register/> } /> 
                    <Route path="/institution-create" exact element={ <InstitutionRegister /> } />
                    <Route path="/infoinstitution" exact element={ <InfoInstitution /> } />
                    <Route path="/userinfo" exact element={ <UserInfoPage /> } />
                    <Route path="/chat/:institutionId" exact element={<Chat />}/>
                    <Route path="/create-event" exact element={<CreateEvent />}/>
                    <Route path="/admininstitutionList" exact element={ <AdminInstitutionList /> } />
                    <Route path='/infouser' element={<PrivateRoutes/>} >
                        <Route path='/infouser' exact element={ <InfoUser/> } /> 
                        

                    </Route>      
                </Routes>
            </Router>
        )
    }