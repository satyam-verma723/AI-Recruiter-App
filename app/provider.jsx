"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect , useState } from 'react'

const provider = ({ children }) => {
    
    const [user,setUser]=useState(null);
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                CreateNewUser(session.user);
            }
        });
        
        // Check on mount in case already logged in
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) CreateNewUser(user);
        });
        
        return () => subscription.unsubscribe();
    }, [])

    const CreateNewUser = async (user) => {
        try {
            const { data: Users, error: queryError } = await supabase
                .from('Users')
                .select('*')
                .eq('email', user?.email);

            console.log('Existing users:', Users);
            
            if (Users?.length === 0) {
                const { data, error: insertError } = await supabase
                    .from('Users')
                    .insert([{
                        email: user?.email,
                        name: user?.user_metadata?.name,
                        picture: user?.user_metadata?.picture,
                    }]);
                    console.log('Insert response data:', data);
                    setUser(data);
                    return;
            }
            setUser(Users[0]);
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }

    return (
        <UserDetailContext.Provider value={{user,setUser}}>
            <div>{children}</div>
        </UserDetailContext.Provider>
        
    )
}

export default provider
export const useUserDetail = () => {
    const context = useContext(UserDetailContext);
    return context;
}
