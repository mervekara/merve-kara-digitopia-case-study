'use client';

import Home from "@/components/HomePage";
import withAuth from '@/hoc/withAuth';

const HomePage = () => {
  return (
    <Home />
  )
}

export default withAuth(HomePage)
