import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";



const Footer: React.FC = () => {


  return (
  <footer className="bg-gray-100 text-gray-800 py-6 mt-10">
  <div className="max-w-screen-xl mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <div className="mb-4 md:mb-0">
{/*               <img
  src="phone-contact.png"
  className="ml-[50px] max-w-full h-[34px]"
/> */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PhoneMarkt</h3>
        <p className="text-sm">Geleceği cebinde taşı</p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">İletişim</h3>
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/sezenyildirim"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-black transition"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-1" />
            Github
          </a>
        </div>
      </div>
    </div>

    <div className="border-t pt-4 text-center text-sm text-gray-500">
      <p>&copy; 2025 PhoneMarkt. All rights reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
