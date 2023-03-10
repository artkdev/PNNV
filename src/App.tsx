import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Old from "./pages/Old/Old"

import { ThemeProvider } from "styled-components"
import { Container } from "./styles"

const light = {
  name: "light-theme",
  colors: {
    header: "hsl(0, 0%, 93%)",
    background: "hsl(0, 0%, 100%)",
    footer: "hsl(0, 1%, 38%)",
    text: "hsl(0, 1%, 16%)",
    quoteBgc: "hsl(60, 40%, 100%)",
    quoteTitle: "hsl(0, 1%, 38%)",
    quoteBody: "hsl(0, 1%, 38%);",
    quoteBorder: "hsl(0, 0%, 87%)",
    border: "hsl(0, 0%, 87%)"
  }
}

const dark = {
  name: "dark-theme",
  colors: {
    header: "hsl(0, 0%, 20%)",
    background: "hsl(0, 1%, 16%)",
    footer: "hsl(0, 0%, 93%)",
    text: "hsl(0, 0%, 100%)",
    quoteBgc: "hsl(0, 0%, 35%)",
    quoteTitle: "hsl(0, 0%, 100%)",
    quoteBody: "hsl(0, 0%, 100%)",
    quoteBorder: "hsl(0, 0%, 59%)",
    border: "hsl(0, 0%, 78%)"
  }
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState(light)
  const [isLight, setIsLight] = useState(true)

  const switchTheme = () => {
    isLight ? setSelectedTheme(dark) : setSelectedTheme(light)
    setIsLight(!isLight)
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container>
        <button onClick={switchTheme}>Switch theme</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/old" element={<Old />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
export default App
