using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class AjustesTacobell : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                schema: "oss-ecommerce",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                schema: "oss-ecommerce",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FrankeCode",
                schema: "oss-ecommerce",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WasserCode",
                schema: "oss-ecommerce",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cantidad",
                schema: "oss-ecommerce",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                schema: "oss-ecommerce",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "FrankeCode",
                schema: "oss-ecommerce",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "WasserCode",
                schema: "oss-ecommerce",
                table: "Product");
        }
    }
}
