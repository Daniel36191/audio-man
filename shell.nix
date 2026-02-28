{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    kdePackages.qtdeclarative
    quickshell
  ];

  shellHook = ''
  '';
}
