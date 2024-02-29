import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export  function dropDown() {
  return (
    <div className="w-64">
      <ul className='drop-down'>
        <li className="nav-link">HOME</li>
        <li className="nav-link">Categories</li>
        <li className="nav-link">CONTACT</li>
      </ul>
    </div>
  )
}



export function navLink() {
    <div >
			<ul className="flex">
				<li className="list-none m-1 p-1 hover:decoration-slate-50 first-letter:uppercase ">Home</li>
				<li className="list-none m-1 p-1 hover:decoration-slate-50 first-letter:uppercase ">latest</li>
				<li className="list-none m-1 p-1 hover:decoration-slate-50 first-letter:uppercase ">contact us</li>
			</ul>
		</div>
}