"use client"
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
const GoogleOAuthProvide = (
    {children}: {children: React.ReactNode}
) => {
  return (
    <>
    <GoogleOAuthProvider clientId={
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
    }>
        {children}
    </GoogleOAuthProvider> 
    </>
  )
}

export default GoogleOAuthProvide