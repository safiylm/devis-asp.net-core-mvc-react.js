using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace devis_asp.net_core_mvc_react.js.Migrations
{
    /// <inheritdoc />
    public partial class othermodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DevisId",
                table: "ProduitModel",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DevisId",
                table: "ProduitModel");
        }
    }
}
