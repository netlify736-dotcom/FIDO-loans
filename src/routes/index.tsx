import { createFileRoute } from '@tanstack/react-router'
import LoanApplicationForm from '../components/LoanApplicationForm'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <LoanApplicationForm />
}
