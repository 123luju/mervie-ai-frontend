import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
const Ctx = createContext(null);
export function AuthProvider({children}){
  const [user,setUser]=useState(()=>{ try{return JSON.parse(localStorage.getItem('mervie_user'))}catch{return null} });
  const [token,setToken]=useState(()=>localStorage.getItem('mervie_token'));
  useEffect(()=>{ if(token){ localStorage.setItem('mervie_token',token); api.defaults.headers.common.Authorization='Bearer '+token; } else { localStorage.removeItem('mervie_token'); delete api.defaults.headers.common.Authorization; } },[token]);
  useEffect(()=>{ if(user) localStorage.setItem('mervie_user',JSON.stringify(user)); else localStorage.removeItem('mervie_user'); },[user]);
  const login=async (email,password)=>{ const {data}=await api.post('/auth/login',{email,password}); setToken(data.token); setUser(data.user); return data.user; };
  const register=async (payload)=>{ const {data}=await api.post('/auth/register',payload); setToken(data.token); setUser(data.user); return data.user; };
  const logout=()=>{ setToken(null); setUser(null); };
  return <Ctx.Provider value={{user,token,login,register,logout}}>{children}</Ctx.Provider>;
}
export const useAuth=()=>useContext(Ctx);
