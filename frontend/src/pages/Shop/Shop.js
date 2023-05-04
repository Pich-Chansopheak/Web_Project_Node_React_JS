import React from 'react';
import { Shop_Breadcrumb } from '../../components/Shop_Page/Shop_Breadcrumb';
import { SideBar } from '../../components/Shop_Page/SideBar';
import { Shop_Items } from '../../components/Shop_Page/Shop_Items';
import { Instagram } from '../../components/Instagram/Instagram';
export const Shop = () => {
  return (
    <>
        <Shop_Breadcrumb/>
        <section class="ftco-section bg-light">
            <div class="container">
                <div class="row">
                    <SideBar/>
                    <Shop_Items />
                </div>
            </div>
        </section>
        <Instagram/>
    </>
  )
}
