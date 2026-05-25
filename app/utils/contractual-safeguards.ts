import type { ContractualSafeguard } from "~~/types/software"

export function mapContractualSafeguardLabel(value: ContractualSafeguard): string {
  switch (value) {
    case "dpa":
      return "DPA institutionnel"
    case "eu_data_boundary":
      return "EU Data Boundary"
    case "scc":
      return "Clauses contractuelles types (SCC)"
    case "dpf":
      return "Data Privacy Framework (DPF)"
    case "independent_audit":
      return "Audit indépendant"
    case "guaranteed_hosting":
      return "Hébergement garanti"
  }
}
