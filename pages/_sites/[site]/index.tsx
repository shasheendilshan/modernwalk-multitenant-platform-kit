import Layout from "@components/Layouts/Layout_modernwalk";
import Home from "@components/sites/Home";
import { useRouter } from "next/router";

import { getAllTenants, getTenantDetails } from "@services/tenants.service";

export default function Index({ tenantId }: any) {
  const router = useRouter();
  const siteName = router.query?.site?.toString();
  console.log("App tenant", tenantId);
  return (
    <Layout name={siteName} tenantId={tenantId}>
      <Home />
    </Layout>
  );
}

export const getStaticPaths: any = async () => {
  const paths = [{ params: { site: "abc" } }, { params: { site: "pqr" } }];

  const Tenants = await getAllTenants();

  const pathList = Tenants?.data.map((tenant: any) => ({
    params: {
      site: tenant.name,
    },
  }));

  console.log("tenants", pathList);
  return {
    paths: pathList,
    fallback: false,
  };
};

export const getStaticProps: any = async (context: any) => {
  const data = [
    { domain: "abc", data: "My first test project" },
    { domain: "pqr", data: "My second test project" },
  ];

  var tenantId = null;

  const Tenant = await getTenantDetails(context.params.site);
  if (Tenant.data.length > 0) {
    tenantId = Tenant?.data[0].id;
    console.log("tenant Id", Tenant?.data[0].id);
  }

  return {
    props: { tenantId: tenantId },
  };
};

// const categories = await getAllCategories();

// const pathList = categories?.data.map((path: string) => {
//   return {
//     params: {
//       id: path.replace(/ /g, "-"),
//     },
//   };
// });

// return {
//   paths: pathList,
//   fallback: false,
// };
