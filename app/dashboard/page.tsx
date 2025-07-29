import { getIssues } from "../../server/lib/dataAccessLayer";

const DashboardPage = async () => {
  const issues = await getIssues(); // accessing data, will have to be wrapped in a Suspense tag

  console.log("### Issues:", issues);
  return <div>Dashboard Page</div>;
};
export default DashboardPage;

export const metadata = {
  title: "Dashboard",
  description: "Manage your projects and tasks",
};
