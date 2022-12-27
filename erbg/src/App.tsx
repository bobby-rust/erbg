import React from 'react'
import './App.css'
import './styles/header.css'
import generateRandomBuild from './functions/generateRandomBuild'
import AnalyticsWrapper from './components/AnalyticsWrapper'
import SmallLayout from './layouts/SmallLayout'
import DevMessage from './components/DevMessage'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    // Set up items state
    const [build, setBuild] = React.useState(generateRandomBuild())
    // End set up items state

    // Generate new build
    function generateNewBuild() {
        setBuild(generateRandomBuild())
    }
    // End generate new build

    // Set up media state
    const [mediaState, setMediaState] = React.useState({
        isLargeMedia: window.matchMedia('(min-width: 1200px)').matches,
    })
    const handler = (e: any) => setMediaState({ isLargeMedia: e.matches })
    window.matchMedia('(min-width: 1200px)').addEventListener('change', handler)
    // End set up media state

    // Set up layout state
    const [layout, setLayout] = React.useState({
        isLargeLayout: true,
        size: '',
    })
    // End set up layout state

    // Set up color button state
    const [colorButtonState, setColorButtonState] = React.useState(true)
    // End set up color button state

    // Set up layout button state
    const [layoutButtonState, setLayoutButtonState] = React.useState(true)
    // End set up layout button state

    // color Styling State
    const [darkMode, setDarkMode] = React.useState({
        isDarkMode: true,
        color: '',
    })
    // End color Styling State

    // Handle color change
    function handleColorChange() {
        setColorButtonState(!colorButtonState)

        if (darkMode.isDarkMode) {
            setDarkMode({ isDarkMode: false, color: '-lt' })
        } else if (!darkMode.isDarkMode) {
            setDarkMode({ isDarkMode: true, color: '' })
        }
    }
    // End handle color change

    // Handle layout change
    function handleLayoutChange() {
        setLayoutButtonState(!layoutButtonState)
        if (layout.isLargeLayout) {
            setLayout({ isLargeLayout: false, size: '-sm' })
        } else if (!layout.isLargeLayout) {
            setLayout({ isLargeLayout: true, size: '' })
        }
    }
    // End handle layout change

    // Handle mobile user
    if (!mediaState.isLargeMedia) {
        return <div className='mobile-message'>Mobile support coming soon.</div>
    }
    // End handle mobile user

    return (
        <div className='App'>
            <>
                <Header
                    color={darkMode.color}
                    handleColorChange={handleColorChange}
                    handleLayoutChange={handleLayoutChange}
                    layoutButtonState={layoutButtonState}
                    colorButtonState={colorButtonState}
                />

                {/* {layout.isLargeLayout && (
                <LargeLayout
                    color={darkMode.color}
                    build={build}
                    handleColorChange={handleColorChange}
                    handleLayoutChange={handleLayoutChange}
                    generateNewBuild={generateNewBuild}
                    size={layout.size}
                />
            )}

            {!layout.isLargeLayout && (
                <SmallLayout
                    color={darkMode.color}
                    build={build}
                    handleColorChange={handleColorChange}
                    handleLayoutChange={handleLayoutChange}
                    generateNewBuild={generateNewBuild}
                    size={layout.size}
                />
            )} */}
                <div className='App-sm'>
                    <SmallLayout
                        color={darkMode.color}
                        build={build}
                        handleColorChange={handleColorChange}
                        handleLayoutChange={handleLayoutChange}
                        generateNewBuild={generateNewBuild}
                        size={layout.size}
                    />
                    <DevMessage />
                </div>
                <AnalyticsWrapper />
            </>
        </div>
    )
}

export default App
