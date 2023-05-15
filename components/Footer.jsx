const Footer = () => {
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  return (
    <footer className="bg-gray-800 overflow-hidden " onContextMenu={handleContextMenu}>
      <div className="container mx-auto py-4 text-gray-400">
        
        <div className="text-center">
          <p>&copy; 2023 PngCrown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
