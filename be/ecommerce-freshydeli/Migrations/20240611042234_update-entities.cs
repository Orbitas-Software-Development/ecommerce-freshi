using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateentities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "pdfReport",
                schema: "oss-ecommerce",
                table: "Order",
                newName: "PdfReport");

            migrationBuilder.AddColumn<bool>(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "Branch",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "Branch");

            migrationBuilder.DropColumn(
                name: "isClient",
                schema: "oss-ecommerce",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "PdfReport",
                schema: "oss-ecommerce",
                table: "Order",
                newName: "pdfReport");
        }
    }
}
