// import Link from 'next/link';

// export default function Header() {
//     return (
//       <div className="header">
//         <Link href="/login">
//           <button id="purple-landing-button">Login</button>
//         </Link>
//         <div className="">
//           </div>
//             <img src="/logo.png" alt="logo" id="landing-logo" width={300} />
//           <div className="flex-end flex">
//         </div>
//       </div>
//     )
//   }


import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <Link href="/login">
        <button id="purple-landing-button">Login</button>
      </Link>
        <div className="header">
            <img src="/logo.png" alt="logo" id="landing-logo" width={300} />
        </div>
    </div>
  )
}


// import Link from 'next/link';

// export default function Header() {
//   return (
//     <div className="header flex-between">
//       <div></div>
//       <img src="/logo.png" alt="logo" id="landing-logo" width={300} />
//       <div className="flex-end">
//         <Link href="/login">
//           <button id="purple-landing-button">Login</button>
//         </Link>
//       </div>
//     </div>
//   );
// }
