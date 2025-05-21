import { Route, Routes } from "react-router-dom"
import Homepage from "./components/Homepage"
import InvoicePage from "./components/InvoicePage"
import CreateInvoice from "./components/CreateInvoice"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/invoice-page" element={<InvoicePage />} />
      <Route path="/create-invoice" element={<CreateInvoice />} />
    </Routes>
  )
}
export default App