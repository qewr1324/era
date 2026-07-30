export function generate(params: any): string {
	return `[global]
fsid = a7f64266-0894-4f1e-a635-d0aeaca0e993
mon_initial_members = mon1,mon2,mon3
mon_host = 192.168.1.10,192.168.1.11,192.168.1.12
public_network = 192.168.1.0/24
cluster_network = 192.168.2.0/24
auth_cluster_required = cephx
auth_service_required = cephx
auth_client_required = cephx
osd_pool_default_size = 3
osd_pool_default_min_size = 2
osd_pool_default_pg_num = 128
osd_pool_default_pgp_num = 128
osd_crush_chooseleaf_type = 1

[mon]
mon_allow_pool_delete = true

[client.rgw.gateway]
rgw_frontends = "beast port=7480"`;
}
