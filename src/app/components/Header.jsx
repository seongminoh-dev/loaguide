export default function Header() {
    return (
      <header className="bg-gray-900 text-white px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* 가운데 LoaGuide 글씨 */}
          <h1 className="text-lg font-bold text-center flex-grow text-gray-100">
            LoaGuide
          </h1>
          {/* 메뉴 아이콘 */}
          <div className="flex items-center">
            <button 
              className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    );
  }
  