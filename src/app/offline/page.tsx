"use client";

export default function Offline() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
            <div className="glass-card rounded-3xl p-8 max-w-md text-center">
                <div className="mb-6">
                    <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Вы офлайн</h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6">Проверьте подключение к интернету и попробуйте снова</p>

                <button onClick={handleReload} className="glass-card rounded-2xl py-3 px-6 font-semibold text-gray-900 dark:text-white hover:scale-105 active:scale-95 transition-all duration-200">
                    Повторить
                </button>
            </div>
        </div>
    );
}
