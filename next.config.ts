import type { NextConfig } from "next";
import { networkInterfaces, type NetworkInterfaceInfo } from "node:os";

// The dev server only serves its scripts to localhost unless other hosts are
// listed. Allow this machine's own LAN addresses (the "Network" URL printed by
// `next dev`) so phones on the same Wi-Fi can load it. Read at startup, so a
// new IP from the router still works. Development only.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((a): a is NetworkInterfaceInfo => !!a && a.family === "IPv4" && !a.internal)
  .map((a) => a.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
};

export default nextConfig;
