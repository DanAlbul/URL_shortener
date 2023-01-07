import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinksPage } from './components/LinksPage.js';
import { CreatePage } from './components/CreatePage.js';
import { DetailPage } from './components/DetailPage.js';
import { AuthPage } from './components/AuthPage.js';
import { NotFoundPage } from './components/NotFoundPage.js';
import { NavBar } from './components/parts/Navbar.js';

export const useRoutes = (isAuthenticated) => {
  switch (isAuthenticated) {
    case true: {
      return (
        <>
          <NavBar />
          <Routes>
            {/* Render component based on path where user is about to go */}
            <Route path="/links" element={<LinksPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            {/* if any of the routes above does not exist - redirect to home */}
            <Route path="*" element={<CreatePage />} />;
            <Route path="*" element={<NotFoundPage />} />;
          </Routes>
        </>
      );
    }

    // if user is not Authenticated at all - redirect to home
    case false: {
      return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />;
          </Routes>
        </>
      );
    }

    default: {
      return <Navigate to="/" />;
    }
  }
};
