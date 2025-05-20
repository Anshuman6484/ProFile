import { ModeToggle } from './components/ModeToggle'
import UploadResume from './components/UploadResume'

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white p-4">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            AI Resume Enhancer <ModeToggle />
          </h1>
          <UploadResume />
        </div>
      </main>
    </>
  )
}

export default App
